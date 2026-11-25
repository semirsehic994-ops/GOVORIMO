package ba.govorimo.app;

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;

/** Šalje podsjetnik samo ako korisnik danas još nije završio lekciju. */
public class ReminderReceiver extends BroadcastReceiver {
    @Override
    public void onReceive(Context c, Intent intent) {
        if (!Prefs.get(c).getBoolean("remOn", true)) return;
        if (Prefs.today().equals(Prefs.get(c).getString("lastDay", ""))) return;
        Notifs.reminder(c);
    }
}
