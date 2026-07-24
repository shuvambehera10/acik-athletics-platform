Build a comprehensive Athletics & Sports Competition Portal featuring:

1. Meet Results & Leaderboard (Results Directory):
   - Structured list layout displaying official performance records grouped by Event Type and Tournament Year.
   - Automatic performance ranking system (#1, #2, #3, etc.) tailored by event type (lowest time for sprints/distance, highest mark for jumps/throws).
   - Event-Specific Filtering: Filtering by an event displays strictly the athletes listed for that specific event.
   - Search & Filter Controls: Filter by Event (100m, 200m, Long Jump, Relays, etc.), Gender (Male/Female/All), Tournament Year, or keyword search across Athlete Name, BIB Number, Roll ID, and College/Club.
   - Result Cards & Badges: Shows Rank #, Athlete Avatar/Photo, Full Name, BIB #, Roll ID, Gender badge, College, and official Mark/Score.

2. Tournament & Competition Scheduler:
   - Interactive schedule displaying upcoming, ongoing, and completed track & field meets.
   - Details view showing meet date, venue location, status tags, and event schedule breakdown.

3. Official Notice Board & Circulars:
   - Announcement feed for official meet notices, schedule modifications, and athletic club news.
   - Color-coded priority tags (Urgent, High, Normal).

4. Sports Photo Gallery:
   - Visual media grid tagged by meet categories.
   - Image cropping modal for updating profile avatars and event photos.

5. Admin Control Panel (Secure Access):
   - Multi-Admin Authentication: Council admin list management with dynamic permission checks.
   - Metrics Management: Direct form to log new athlete performances (Name, Gender, Event, Mark, BIB, Roll ID, Tournament Year).
   - Metrics Bulk Operations: Ability to delete individual entries or clear/purge all metric records.
   - Tournament Creator: Publish new competition fixtures, dates, and venues.
   - Circular Publishing: Create, edit, and remove official announcements.
   - Custom Branding: Upload and set custom organization/institute and club logos.

6. Database & Persistence:
   - Real-time Firestore synchronization for all metrics, competitions, circulars, and admin lists.
   - Seamless offline fallback using client local storage synchronization.
