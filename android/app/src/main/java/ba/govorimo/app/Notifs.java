package ba.govorimo.app;

import android.app.AlarmManager;
import android.app.Notification;
import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.app.PendingIntent;
import android.app.job.JobInfo;
import android.app.job.JobScheduler;
import android.content.ComponentName;
import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.os.Build;

import java.util.Calendar;

/** Obavještenja: dnevni podsjetnik i nova verzija aplikacije. */
final class Notifs {
    static final String CH_REM = "reminder";
    static final String CH_UPD = "updates";
    static final int ID_REM = 1;
    static final int ID_UPD = 2;
    static final int JOB_UPDATE = 1001;
    private static final int PI_FLAGS = PendingIntent.FLAG_UPDATE_CURRENT | PendingIntent.FLAG_IMMUTABLE;

    private Notifs() {}

    static void channels(Context c) {
        if (Build.VERSION.SDK_INT < 26) return;
        NotificationManager nm = c.getSystemService(NotificationManager.class);
        nm.createNotificationChannel(new NotificationChannel(CH_REM, Txt.get(c, "ch_reminder"), NotificationManager.IMPORTANCE_DEFAULT));
        nm.createNotificationChannel(new NotificationChannel(CH_UPD, Txt.get(c, "ch_updates"), NotificationManager.IMPORTANCE_DEFAULT));
    }

    private static Notification.Builder builder(Context c, String ch) {
        Notification.Builder b = Build.VERSION.SDK_INT >= 26 ? new Notification.Builder(c, ch) : new Notification.Builder(c);
        int icon = c.getResources().getIdentifier("ic_stat", "drawable", c.getPackageName());
        b.setSmallIcon(icon != 0 ? icon : c.getApplicationInfo().icon)
         .setColor(0xFF0F7F4F)
         .setAutoCancel(true)
         .setContentTitle("Govorimo");
        return b;
    }

    private static void post(Context c, int id, Notification n) {
        channels(c);
        if (Build.VERSION.SDK_INT >= 33 && c.checkSelfPermission("android.permission.POST_NOTIFICATIONS") != android.content.pm.PackageManager.PERMISSION_GRANTED) return;
        c.getSystemService(NotificationManager.class).notify(id, n);
    }

    static void reminder(Context c) {
        Intent open = new Intent(c, MainActivity.class).addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
        String text = Txt.get(c, "reminder");
        Notification n = builder(c, CH_REM)
                .setContentText(text)
                .setStyle(new Notification.BigTextStyle().bigText(text))
                .setContentIntent(PendingIntent.getActivity(c, 10, open, PI_FLAGS))
                .build();
        post(c, ID_REM, n);
    }

    static void update(Context c, String versionName, String apkUrl) {
        Intent open = new Intent(c, MainActivity.class)
                .addFlags(Intent.FLAG_ACTIVITY_NEW_TASK)
                .putExtra("apk", apkUrl)
                .putExtra("ver", versionName);
        Notification n = builder(c, CH_UPD)
                .setContentTitle(String.format(Txt.get(c, "update_title"), versionName))
                .setContentText(Txt.get(c, "update_body"))
                .setContentIntent(PendingIntent.getActivity(c, 11, open, PI_FLAGS))
                .build();
        post(c, ID_UPD, n);
    }

    static void installReady(Context c, Intent confirm) {
        confirm.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
        Notification n = builder(c, CH_UPD)
                .setContentText(Txt.get(c, "install_ready"))
                .setContentIntent(PendingIntent.getActivity(c, 12, confirm, PI_FLAGS))
                .build();
        post(c, ID_UPD, n);
    }

    /** Dnevni podsjetnik u vrijeme koje je korisnik odabrao u profilu. */
    static void scheduleReminder(Context c) {
        SharedPreferences p = Prefs.get(c);
        AlarmManager am = c.getSystemService(AlarmManager.class);
        PendingIntent pi = PendingIntent.getBroadcast(c, 20, new Intent(c, ReminderReceiver.class), PI_FLAGS);
        am.cancel(pi);
        if (!p.getBoolean("remOn", true)) return;
        Calendar cal = Calendar.getInstance();
        cal.set(Calendar.HOUR_OF_DAY, p.getInt("remH", 19));
        cal.set(Calendar.MINUTE, p.getInt("remM", 0));
        cal.set(Calendar.SECOND, 0);
        cal.set(Calendar.MILLISECOND, 0);
        if (cal.getTimeInMillis() <= System.currentTimeMillis()) cal.add(Calendar.DAY_OF_YEAR, 1);
        am.setInexactRepeating(AlarmManager.RTC_WAKEUP, cal.getTimeInMillis(), AlarmManager.INTERVAL_DAY, pi);
    }

    /** Provjera nove verzije u pozadini, otprilike svakih 6 sati, kad postoji internet. */
    static void scheduleUpdateJob(Context c) {
        JobScheduler js = c.getSystemService(JobScheduler.class);
        if (js == null || js.getPendingJob(JOB_UPDATE) != null) return;
        JobInfo ji = new JobInfo.Builder(JOB_UPDATE, new ComponentName(c, UpdateJob.class))
                .setRequiredNetworkType(JobInfo.NETWORK_TYPE_ANY)
                .setPeriodic(6L * 60 * 60 * 1000)
                .setPersisted(true)
                .build();
        js.schedule(ji);
    }
}
