package ba.govorimo.app;

import android.app.Activity;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.graphics.Color;
import android.net.Uri;
import android.os.Build;
import android.os.Bundle;
import android.view.View;
import android.webkit.WebResourceError;
import android.webkit.WebResourceRequest;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;

/** Glavni ekran: prikazuje web aplikaciju s GitHub Pages i dodaje nativne mogućnosti. */
public class MainActivity extends Activity {
    static final int REQ_MIC = 11;
    static final int REQ_NOTIF = 12;

    private WebView web;
    private Bridge bridge;
    private String appUrl;

    @Override
    @SuppressWarnings("deprecation")
    protected void onCreate(Bundle saved) {
        super.onCreate(saved);
        appUrl = Prefs.appUrl(this);
        Notifs.channels(this);

        getWindow().setStatusBarColor(Color.WHITE);
        getWindow().setNavigationBarColor(Color.WHITE);
        int flags = View.SYSTEM_UI_FLAG_LIGHT_STATUS_BAR;
        if (Build.VERSION.SDK_INT >= 26) flags |= View.SYSTEM_UI_FLAG_LIGHT_NAVIGATION_BAR;
        getWindow().getDecorView().setSystemUiVisibility(flags);

        web = new WebView(this);
        web.setBackgroundColor(Color.WHITE);
        setContentView(web);
        WebSettings s = web.getSettings();
        s.setJavaScriptEnabled(true);
        s.setDomStorageEnabled(true);
        s.setDatabaseEnabled(true);
        s.setMediaPlaybackRequiresUserGesture(false);
        s.setAllowFileAccess(false);
        s.setAllowContentAccess(false);
        s.setTextZoom(100);

        bridge = new Bridge(this, web);
        web.addJavascriptInterface(bridge, "GovorimoAndroid");
        web.setWebViewClient(new WebViewClient() {
            @Override
            public boolean shouldOverrideUrlLoading(WebView v, WebResourceRequest r) {
                Uri u = r.getUrl();
                if (isApp(u)) return false;
                try { startActivity(new Intent(Intent.ACTION_VIEW, u)); } catch (Exception ignored) { }
                return true;
            }

            @Override
            public void onReceivedError(WebView v, WebResourceRequest r, WebResourceError e) {
                if (r.isForMainFrame()) v.loadUrl("file:///android_asset/offline.html");
            }
        });

        if (saved != null) web.restoreState(saved);
        else loadApp();

        if (Build.VERSION.SDK_INT >= 33 && checkSelfPermission("android.permission.POST_NOTIFICATIONS") != PackageManager.PERMISSION_GRANTED) {
            requestPermissions(new String[] { "android.permission.POST_NOTIFICATIONS" }, REQ_NOTIF);
        }
        Notifs.scheduleReminder(this);
        Notifs.scheduleUpdateJob(this);
        handleIntent(getIntent());
    }

    void loadApp() {
        web.loadUrl(appUrl);
    }

    private boolean isApp(Uri u) {
        Uri a = Uri.parse(appUrl);
        if ("https".equals(u.getScheme()) && a.getHost() != null && a.getHost().equalsIgnoreCase(u.getHost())) return true;
        return "file".equals(u.getScheme()) && u.getPath() != null && u.getPath().startsWith("/android_asset/");
    }

    private void handleIntent(Intent i) {
        if (i == null) return;
        String apk = i.getStringExtra("apk");
        if (apk != null && !apk.isEmpty()) {
            i.removeExtra("apk");
            Updater.start(this, apk, i.getStringExtra("ver"));
        }
    }

    @Override
    protected void onNewIntent(Intent intent) {
        super.onNewIntent(intent);
        setIntent(intent);
        handleIntent(intent);
    }

    @Override
    protected void onResume() {
        super.onResume();
        web.onResume();
        Updater.resumePending(this);
    }

    @Override
    protected void onPause() {
        web.onPause();
        super.onPause();
    }

    @Override
    public void onRequestPermissionsResult(int code, String[] perms, int[] results) {
        super.onRequestPermissionsResult(code, perms, results);
        if (code == REQ_MIC) bridge.onMicPermission(results.length > 0 && results[0] == PackageManager.PERMISSION_GRANTED);
    }

    @Override
    @SuppressWarnings("deprecation")
    public void onBackPressed() {
        if (web.canGoBack()) web.goBack();
        else super.onBackPressed();
    }

    @Override
    protected void onSaveInstanceState(Bundle out) {
        super.onSaveInstanceState(out);
        web.saveState(out);
    }

    @Override
    protected void onDestroy() {
        bridge.destroy();
        web.destroy();
        super.onDestroy();
    }
}
