package ba.govorimo.app;

import android.app.Activity;
import android.app.PendingIntent;
import android.content.Context;
import android.content.Intent;
import android.content.pm.PackageInstaller;
import android.net.Uri;
import android.os.Build;
import android.os.Handler;
import android.os.Looper;
import android.provider.Settings;
import android.widget.Toast;

import java.io.InputStream;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;

/** Preuzima novi APK s GitHub Releases i predaje ga Androidovom instalateru. */
final class Updater {
    private static String pendingUrl;
    private static String pendingVer;

    private Updater() {}

    private static boolean trusted(Context c, String url) {
        return url != null && (url.startsWith("https://github.com/") || url.startsWith(Prefs.appUrl(c)));
    }

    static void start(Activity a, String url, String ver) {
        if (!trusted(a, url)) return;
        if (Build.VERSION.SDK_INT >= 26 && !a.getPackageManager().canRequestPackageInstalls()) {
            pendingUrl = url;
            pendingVer = ver;
            Toast.makeText(a, Txt.get(a, "allow_install"), Toast.LENGTH_LONG).show();
            try {
                a.startActivity(new Intent(Settings.ACTION_MANAGE_UNKNOWN_APP_SOURCES, Uri.parse("package:" + a.getPackageName())));
            } catch (Exception ignored) { }
            return;
        }
        final Context app = a.getApplicationContext();
        Toast.makeText(a, Txt.get(a, "downloading"), Toast.LENGTH_LONG).show();
        new Thread(() -> {
            try {
                install(app, url);
            } catch (Exception e) {
                new Handler(Looper.getMainLooper()).post(() -> Toast.makeText(app, Txt.get(app, "download_failed"), Toast.LENGTH_LONG).show());
            }
        }).start();
    }

    /** Nakon što korisnik dozvoli instalaciju u postavkama i vrati se, nastavlja automatski. */
    static void resumePending(Activity a) {
        if (pendingUrl == null) return;
        if (Build.VERSION.SDK_INT >= 26 && !a.getPackageManager().canRequestPackageInstalls()) return;
        String u = pendingUrl, v = pendingVer;
        pendingUrl = null;
        pendingVer = null;
        start(a, u, v);
    }

    private static void install(Context c, String url) throws Exception {
        HttpURLConnection con = (HttpURLConnection) new URL(url).openConnection();
        con.setInstanceFollowRedirects(true);
        con.setConnectTimeout(20000);
        con.setReadTimeout(60000);
        if (con.getResponseCode() != 200) throw new IllegalStateException("HTTP " + con.getResponseCode());
        long len = con.getContentLengthLong();

        PackageInstaller pi = c.getPackageManager().getPackageInstaller();
        PackageInstaller.SessionParams params = new PackageInstaller.SessionParams(PackageInstaller.SessionParams.MODE_FULL_INSTALL);
        params.setAppPackageName(c.getPackageName());
        int sid = pi.createSession(params);
        PackageInstaller.Session s = pi.openSession(sid);
        try {
            try (InputStream in = con.getInputStream(); OutputStream out = s.openWrite("govorimo.apk", 0, len > 0 ? len : -1)) {
                byte[] buf = new byte[65536];
                int n;
                while ((n = in.read(buf)) > 0) out.write(buf, 0, n);
                s.fsync(out);
            }
            int flags = PendingIntent.FLAG_UPDATE_CURRENT | (Build.VERSION.SDK_INT >= 31 ? PendingIntent.FLAG_MUTABLE : 0);
            PendingIntent done = PendingIntent.getBroadcast(c, sid, new Intent(c, InstallReceiver.class), flags);
            s.commit(done.getIntentSender());
        } catch (Exception e) {
            s.abandon();
            throw e;
        } finally {
            s.close();
        }
    }
}
