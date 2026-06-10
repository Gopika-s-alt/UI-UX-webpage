# SmartNest – Smart Home Dashboard

## Setup

1. Install dependencies:
```
npm install
```

2. Add your background image:
   - Place your blurred interior house photo as `public/bg.jpg`
   - Any JPG/PNG works — the CSS handles the overlay

3. Run development server:
```
npm run dev
```

4. Build for production:
```
npm run build
```

## Features
- Dashboard with live device status, door lock toggle, power graph
- Rooms — add/remove rooms with custom icons
- Devices — per-room device management, toggle on/off
- Stats — weekly/monthly energy charts
- Members — manage home access
- Notifications — alerts panel
- Settings — preferences

## File Structure
```
src/
  context/HomeContext.jsx   — Global state (rooms, devices, members)
  components/
    Layout.jsx              — App shell
    Sidebar.jsx             — Navigation
    DeviceCard.jsx          — Individual device tile
    Modal.jsx               — Reusable modal
    PageHeader.jsx          — Page title bar
  pages/
    Dashboard.jsx           — Home overview
    Rooms.jsx               — Room list
    RoomDetail.jsx          — Devices inside a room
    Devices.jsx             — All devices view
    Stats.jsx               — Energy charts
    Members.jsx             — Access management
    Notifications.jsx       — Alerts
    Settings.jsx            — App settings
```
