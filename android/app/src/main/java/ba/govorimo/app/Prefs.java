package ba.govorimo.app;

import android.content.Context;
import android.content.SharedPreferences;

/** Mala zajednička pomoć: postavke i adresa aplikacije. */
final class Prefs {
    private Prefs() {}

    static SharedPreferences get(Context c) {
        return c.getSharedPreferences("govorimo", Context.MODE_PRIVATE);
    }

    /** Adresa PWA aplikacije na GitHub Pages (res/values/strings.xml → app_url). */
    static String appUrl(Context c) {
        int id = c.getResources().getIdentifier("app_url", "string", c.getPackageName());
        String u = id != 0 ? c.getString(id) : "";
        return u.endsWith("/") ? u : u + "/";
    }

    static String today() {
        return new java.text.SimpleDateFormat("yyyy-MM-dd", java.util.Locale.US).format(new java.util.Date());
    }
}
