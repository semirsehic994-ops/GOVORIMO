package ba.govorimo.app;

import android.app.job.JobParameters;
import android.app.job.JobService;
import android.content.Context;
import android.content.SharedPreferences;
import android.content.pm.PackageInfo;
import android.os.Build;

import org.json.JSONObject;

import java.io.ByteArrayOutputStream;
import java.io.InputStream;
import java.net.HttpURLConnection;
import java.net.URL;

/** Čita version.json s GitHub Pages i javlja obavještenjem kad postoji novi APK. */
public class UpdateJob extends JobService {
    @Override
    public boolean onStartJob(JobParameters params) {
        final Context app = getApplicationContext();
        new Thread(() -> {
            check(app);
            jobFinished(params, false);
        }).start();
        return true;
    }

    @Override
    public boolean onStopJob(JobParameters params) {
        return true;
    }

    static void check(Context c) {
        try {
            HttpURLConnection con = (HttpURLConnection) new URL(Prefs.appUrl(c) + "version.json?t=" + System.currentTimeMillis()).openConnection();
            con.setConnectTimeout(15000);
            con.setReadTimeout(15000);
            con.setUseCaches(false);
            if (con.getResponseCode() != 200) return;
            ByteArrayOutputStream bo = new ByteArrayOutputStream();
            try (InputStream in = con.getInputStream()) {
                byte[] buf = new byte[8192];
                int n;
                while ((n = in.read(buf)) > 0) bo.write(buf, 0, n);
            }
            JSONObject a = new JSONObject(bo.toString("UTF-8")).getJSONObject("android");
            int code = a.getInt("versionCode");
            SharedPreferences p = Prefs.get(c);
            if (code > currentCode(c) && p.getInt("notifiedCode", 0) < code) {
                Notifs.update(c, a.optString("versionName", ""), a.optString("apk", ""));
                p.edit().putInt("notifiedCode", code).apply();
            }
        } catch (Exception ignored) {
            // bez interneta ili bez version.json: pokušat će ponovo kasnije
        }
    }

    @SuppressWarnings("deprecation")
    static int currentCode(Context c) {
        try {
            PackageInfo pi = c.getPackageManager().getPackageInfo(c.getPackageName(), 0);
            return Build.VERSION.SDK_INT >= 28 ? (int) pi.getLongVersionCode() : pi.versionCode;
        } catch (Exception e) {
            return 0;
        }
    }
}
