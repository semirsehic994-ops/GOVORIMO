package ba.govorimo.app;

import android.Manifest;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.os.Bundle;
import android.speech.RecognitionListener;
import android.speech.RecognizerIntent;
import android.speech.SpeechRecognizer;
import android.speech.tts.TextToSpeech;
import android.webkit.JavascriptInterface;
import android.webkit.WebView;

import org.json.JSONArray;
import org.json.JSONObject;

import java.util.ArrayList;
import java.util.List;
import java.util.Locale;

/**
 * Most između web aplikacije i Androida (window.GovorimoAndroid u JavaScriptu).
 * Android WebView nema izgovor ni prepoznavanje govora, pa ih radimo nativno.
 */
final class Bridge {
    private static final int ERROR_LANGUAGE_NOT_SUPPORTED = 12; // SpeechRecognizer, Android 12+

    private final MainActivity act;
    private final WebView web;
    private TextToSpeech tts;
    private volatile boolean ttsReady;
    private SpeechRecognizer rec;
    private String pendingListen;

    Bridge(MainActivity a, WebView w) {
        act = a;
        web = w;
        tts = new TextToSpeech(a.getApplicationContext(), status -> {
            if (status != TextToSpeech.SUCCESS) return;
            // Bosanski glas ako postoji, inače hrvatski ili srpski (isti izgovor latinice).
            Locale[] prefs = { new Locale("bs", "BA"), new Locale("hr", "HR"), new Locale("sr", "RS"), new Locale("sr", "BA"), new Locale("sl", "SI") };
            for (Locale l : prefs) {
                if (tts.isLanguageAvailable(l) >= TextToSpeech.LANG_AVAILABLE) {
                    tts.setLanguage(l);
                    break;
                }
            }
            ttsReady = true;
        });
    }

    @JavascriptInterface
    public void speak(String text, float rate) {
        if (tts == null || !ttsReady || text == null) return;
        tts.setSpeechRate(Math.max(0.3f, Math.min(rate, 2f)));
        tts.speak(text, TextToSpeech.QUEUE_FLUSH, null, "g" + System.nanoTime());
    }

    @JavascriptInterface
    public void listen(String id) {
        act.runOnUiThread(() -> startListen(id));
    }

    private void startListen(String id) {
        if (!SpeechRecognizer.isRecognitionAvailable(act)) {
            send(id, false, "unsupported", null);
            return;
        }
        if (act.checkSelfPermission(Manifest.permission.RECORD_AUDIO) != PackageManager.PERMISSION_GRANTED) {
            pendingListen = id;
            act.requestPermissions(new String[] { Manifest.permission.RECORD_AUDIO }, MainActivity.REQ_MIC);
            return;
        }
        recognize(id, "bs-BA");
    }

    void onMicPermission(boolean granted) {
        String id = pendingListen;
        pendingListen = null;
        if (id == null) return;
        if (granted) recognize(id, "bs-BA");
        else send(id, false, "not-allowed", null);
    }

    private void recognize(String id, String lang) {
        if (rec != null) rec.destroy();
        rec = SpeechRecognizer.createSpeechRecognizer(act);
        Intent i = new Intent(RecognizerIntent.ACTION_RECOGNIZE_SPEECH);
        i.putExtra(RecognizerIntent.EXTRA_LANGUAGE_MODEL, RecognizerIntent.LANGUAGE_MODEL_FREE_FORM);
        i.putExtra(RecognizerIntent.EXTRA_LANGUAGE, lang);
        i.putExtra(RecognizerIntent.EXTRA_LANGUAGE_PREFERENCE, lang);
        i.putExtra(RecognizerIntent.EXTRA_MAX_RESULTS, 5);
        i.putExtra(RecognizerIntent.EXTRA_PARTIAL_RESULTS, false);
        rec.setRecognitionListener(new RecognitionListener() {
            private boolean finished;

            @Override public void onResults(Bundle b) {
                if (finished) return;
                finished = true;
                send(id, true, null, b.getStringArrayList(SpeechRecognizer.RESULTS_RECOGNITION));
            }

            @Override public void onError(int e) {
                if (finished) return;
                finished = true;
                if (e == ERROR_LANGUAGE_NOT_SUPPORTED && "bs-BA".equals(lang)) {
                    recognize(id, "hr-HR");
                    return;
                }
                String err = e == SpeechRecognizer.ERROR_INSUFFICIENT_PERMISSIONS ? "not-allowed"
                        : (e == SpeechRecognizer.ERROR_NO_MATCH || e == SpeechRecognizer.ERROR_SPEECH_TIMEOUT) ? "no-speech"
                        : "error-" + e;
                send(id, false, err, null);
            }

            @Override public void onReadyForSpeech(Bundle b) { }
            @Override public void onBeginningOfSpeech() { }
            @Override public void onRmsChanged(float v) { }
            @Override public void onBufferReceived(byte[] bytes) { }
            @Override public void onEndOfSpeech() { }
            @Override public void onPartialResults(Bundle b) { }
            @Override public void onEvent(int t, Bundle b) { }
        });
        rec.startListening(i);
    }

    private void send(String id, boolean ok, String err, List<String> results) {
        try {
            JSONObject o = new JSONObject();
            o.put("ok", ok);
            if (err != null) o.put("error", err);
            JSONArray a = new JSONArray();
            if (results != null) for (String s : results) a.put(s);
            o.put("results", a);
            final String js = "window.__govorimoSpeech&&window.__govorimoSpeech(" + JSONObject.quote(id) + "," + JSONObject.quote(o.toString()) + ")";
            act.runOnUiThread(() -> web.evaluateJavascript(js, null));
        } catch (Exception ignored) { }
    }

    @JavascriptInterface
    public void setLang(String lang) {
        Prefs.get(act).edit().putString("lang", "ar".equals(lang) ? "ar" : "tr").apply();
        Notifs.channels(act);
    }

    @JavascriptInterface
    public void setReminder(boolean on, int hour, int minute) {
        Prefs.get(act).edit().putBoolean("remOn", on).putInt("remH", hour).putInt("remM", minute).apply();
        Notifs.scheduleReminder(act);
    }

    @JavascriptInterface
    public void lessonDone(String day) {
        Prefs.get(act).edit().putString("lastDay", day).apply();
    }

    @JavascriptInterface
    public int getVersionCode() {
        return UpdateJob.currentCode(act);
    }

    @JavascriptInterface
    public String getVersionName() {
        try {
            return act.getPackageManager().getPackageInfo(act.getPackageName(), 0).versionName;
        } catch (Exception e) {
            return "";
        }
    }

    @JavascriptInterface
    public void downloadUpdate(String url, String versionName) {
        act.runOnUiThread(() -> Updater.start(act, url, versionName));
    }

    @JavascriptInterface
    public void retry() {
        act.runOnUiThread(act::loadApp);
    }

    void destroy() {
        if (tts != null) tts.shutdown();
        if (rec != null) rec.destroy();
    }
}
