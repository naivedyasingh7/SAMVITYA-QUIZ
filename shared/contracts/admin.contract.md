# Admin Interface Contract

- **Owner:** Suvradeep (`frontend/src/features/admin-system/`)
- **Key Tables:** `admins`, `activities`
- **Exported Methods / Components:**
  - `adminService.login(credentials)`
  - `activityService.createActivity(activityData)`
  - `activityService.listActivities(filters)`
  - `adminService.awardOfflinePoints({ participant_id, activity_id, points, reason })`
