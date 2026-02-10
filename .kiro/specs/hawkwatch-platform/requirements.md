# HawkWatch Platform - Requirements Document

## 1. Project Overview

HawkWatch is an intelligent video surveillance platform that uses AI to detect crimes, suspicious activities, and life-threatening events in real-time. The system provides automated incident detection, time-stamped reports, and instant notifications to security personnel.

### 1.1 Target Users
- Security personnel at retail stores, hospitals, shopping malls
- Business owners requiring automated surveillance monitoring
- Organizations needing intelligent video analysis capabilities

### 1.2 Core Value Proposition
Transform passive video recording systems into intelligent security guardians that understand, analyze, and act on security events without requiring constant human monitoring.

---

## 2. Functional Requirements

### 2.1 User Authentication & Authorization

#### 2.1.1 User Registration
- Users can create accounts with email and password
- System validates email format and password strength
- Account activation via email verification

#### 2.1.2 User Login
- Users can sign in with email and password
- Session management with secure tokens
- Password reset functionality via email

#### 2.1.3 Access Control
- Authenticated users can access protected features
- Unauthenticated users redirected to sign-in page
- Role-based access for future expansion

**Acceptance Criteria:**
- AC 2.1.1: New users can successfully register with valid credentials
- AC 2.1.2: Registered users can sign in and access protected pages
- AC 2.1.3: Password reset emails are sent successfully
- AC 2.1.4: Invalid credentials show appropriate error messages

---

### 2.2 Real-Time Video Stream Analysis

#### 2.2.1 Webcam Access
- System requests and obtains webcam permissions
- Video stream displays at 640x360 resolution (16:9 aspect ratio)
- Stream runs at 30 FPS for smooth playback

#### 2.2.2 AI-Powered Event Detection
- Google Gemini Visual Language Model analyzes video frames
- TensorFlow.js performs client-side face detection using BlazeFace
- TensorFlow.js performs pose detection using MoveNet
- Frame analysis occurs every 3 seconds during recording
- System detects: criminal activity, suspicious behavior, health emergencies (fainting, choking)

#### 2.2.3 Real-Time Visualization
- Bounding boxes overlay detected faces with confidence scores
- Pose keypoints display on detected persons
- Visual indicators update in real-time during recording

#### 2.2.4 Audio Transcription
- Speech recognition captures audio during recording
- Transcript updates in real-time
- Transcript data included in event analysis context

#### 2.2.5 Video Recording
- MediaRecorder captures video stream in MP4 format
- Recording starts/stops with user control
- Recorded video available for playback after stopping

**Acceptance Criteria:**
- AC 2.2.1: Webcam initializes successfully with proper permissions
- AC 2.2.2: Face detection displays bounding boxes with >50% confidence
- AC 2.2.3: Pose keypoints render for detected persons with >30% confidence
- AC 2.2.4: Events are detected and timestamped during recording
- AC 2.2.5: Audio transcription captures spoken words accurately
- AC 2.2.6: Recorded video plays back correctly after stopping

---

### 2.3 Video Upload & Analysis

#### 2.3.1 File Upload
- Users can upload MP4 video files via file picker or drag-and-drop
- System validates video format and file size
- Upload progress indicator shows completion percentage

#### 2.3.2 Batch Frame Analysis
- System extracts frames at 3-second intervals
- Each frame analyzed by Gemini Visual Language Model
- Progress indicator updates during analysis
- Analysis results aggregated into timestamped events

#### 2.3.3 Video Playback
- Uploaded videos play in custom video player
- Users can seek to specific timestamps
- Timeline shows detected events

**Acceptance Criteria:**
- AC 2.3.1: Video files upload successfully with progress indication
- AC 2.3.2: Drag-and-drop upload works correctly
- AC 2.3.3: Frame analysis completes for entire video duration
- AC 2.3.4: Timestamps generated match detected events
- AC 2.3.5: Video playback allows seeking to specific timestamps

---

### 2.4 Event Detection & Classification

#### 2.4.1 Event Types
- System classifies events as "dangerous" or "normal"
- Dangerous events include: fighting, robbery, shoplifting, stealing, vandalism, fainting, choking
- Normal events include: routine activities, person detection, movement

#### 2.4.2 Event Metadata
- Each event includes: timestamp, description, danger classification
- Events stored with associated video reference
- Events displayed in chronological order

**Acceptance Criteria:**
- AC 2.4.1: Dangerous events correctly flagged with isDangerous=true
- AC 2.4.2: Event descriptions are clear and actionable
- AC 2.4.3: Timestamps accurately reflect event occurrence time
- AC 2.4.4: Events persist with saved videos

---

### 2.5 Alert & Notification System

#### 2.5.1 Email Notifications
- System sends email alerts for dangerous events
- Email includes: event timestamp, description, severity
- Notifications sent in real-time during live stream analysis
- Email service uses Resend API

#### 2.5.2 Notification Requirements
- Only authenticated users receive notifications
- Email configuration required in environment variables
- Failed notifications show user-friendly error messages

**Acceptance Criteria:**
- AC 2.5.1: Email sent within 5 seconds of dangerous event detection
- AC 2.5.2: Email contains accurate event details
- AC 2.5.3: Unauthenticated users see sign-in prompt for notifications
- AC 2.5.4: Email service errors handled gracefully

---

### 2.6 Video Library & Management

#### 2.6.1 Save Videos
- Users can save analyzed videos to library
- Each saved video includes: name, URL, thumbnail, timestamps
- Videos stored in browser localStorage
- Users can assign custom names to saved videos

#### 2.6.2 Browse Saved Videos
- Gallery view displays all saved videos with thumbnails
- Search functionality filters by video name or event description
- Videos displayed in grid layout (responsive)

#### 2.6.3 Video Details
- Detailed view shows video player with timeline
- Timestamp list displays all detected events
- Users can click timestamps to seek video
- Timeline visualization shows event distribution

#### 2.6.4 Delete Videos
- Users can delete saved videos from library
- Deletion removes video from localStorage
- Confirmation prevents accidental deletion

**Acceptance Criteria:**
- AC 2.6.1: Videos save successfully with all metadata
- AC 2.6.2: Saved videos persist across browser sessions
- AC 2.6.3: Search filters videos correctly by name and description
- AC 2.6.4: Video detail page displays complete analysis
- AC 2.6.5: Delete operation removes video permanently
- AC 2.6.6: Thumbnail generation works for all video formats

---

### 2.7 AI Assistant (Contextual Support)

#### 2.7.1 Chat Interface
- OpenAI-powered assistant available during monitoring
- Assistant receives context about current events
- Users can ask questions about detected events
- Assistant provides situational guidance

#### 2.7.2 Context Awareness
- Assistant knows about recent detected events
- Provides advice based on event type (e.g., "What should I do if someone fainted?")
- Responses tailored to security scenarios

**Acceptance Criteria:**
- AC 2.7.1: Chat interface accessible during live monitoring
- AC 2.7.2: Assistant responds with relevant security advice
- AC 2.7.3: Context includes recent event information
- AC 2.7.4: Response time under 3 seconds for typical queries

---

### 2.8 Statistics & Analytics

#### 2.8.1 Dashboard Overview
- Statistics page shows aggregated event data
- Charts visualize event types and frequency
- AI-generated summary of security trends

#### 2.8.2 Data Export
- Users can export statistics to CSV format
- Export includes: timestamps, event types, descriptions
- Date range filtering for exports

**Acceptance Criteria:**
- AC 2.8.1: Statistics page displays accurate event counts
- AC 2.8.2: Charts render correctly with event data
- AC 2.8.3: AI summary provides meaningful insights
- AC 2.8.4: CSV export contains complete event data
- AC 2.8.5: Date filtering works correctly

---

### 2.9 Timeline Visualization

#### 2.9.1 Interactive Timeline
- Visual timeline shows event distribution across video duration
- Events color-coded by danger level (warning vs normal)
- Current playback position indicated on timeline
- Clicking timeline seeks video to that position

#### 2.9.2 Event Markers
- Dangerous events highlighted in red/warning color
- Normal events shown in neutral color
- Event labels display on hover
- Timeline scales to video duration

**Acceptance Criteria:**
- AC 2.9.1: Timeline displays all detected events
- AC 2.9.2: Color coding distinguishes dangerous vs normal events
- AC 2.9.3: Current time indicator updates during playback
- AC 2.9.4: Clicking timeline seeks video correctly
- AC 2.9.5: Timeline scales appropriately for different video lengths

---

## 3. Non-Functional Requirements

### 3.1 Performance

#### 3.1.1 Real-Time Processing
- Frame analysis completes within 3 seconds per frame
- Face detection runs at minimum 10 FPS
- Pose detection runs at minimum 10 FPS
- UI remains responsive during analysis

#### 3.1.2 Video Processing
- Upload analysis processes videos up to 10 minutes
- Frame extraction completes without browser freezing
- Progress updates every second during analysis

**Acceptance Criteria:**
- AC 3.1.1: Real-time stream maintains <100ms latency
- AC 3.1.2: Browser remains responsive during heavy processing
- AC 3.1.3: Memory usage stays under 500MB during analysis

---

### 3.2 Reliability

#### 3.2.1 Error Handling
- Graceful degradation when ML models fail to load
- Clear error messages for all failure scenarios
- Automatic retry for transient API failures

#### 3.2.2 Data Persistence
- Saved videos persist across browser sessions
- No data loss during page refresh
- LocalStorage quota management

**Acceptance Criteria:**
- AC 3.2.1: ML model failures show user-friendly messages
- AC 3.2.2: API errors don't crash the application
- AC 3.2.3: Data persists correctly in localStorage
- AC 3.2.4: Quota exceeded errors handled gracefully

---

### 3.3 Security

#### 3.3.1 Authentication Security
- Passwords hashed using industry-standard algorithms
- Session tokens expire after inactivity
- HTTPS required for all API communications

#### 3.3.2 Data Privacy
- Video data processed client-side when possible
- No unauthorized access to user videos
- Compliance with data protection regulations

**Acceptance Criteria:**
- AC 3.3.1: Passwords never stored in plain text
- AC 3.3.2: Session tokens invalidate after 24 hours
- AC 3.3.3: All API calls use HTTPS
- AC 3.3.4: User data isolated per account

---

### 3.4 Usability

#### 3.4.1 User Interface
- Intuitive navigation between features
- Responsive design for desktop and tablet
- Dark theme optimized for security monitoring
- Loading states for all async operations

#### 3.4.2 Accessibility
- Keyboard navigation support
- Screen reader compatible
- Sufficient color contrast
- Focus indicators visible

**Acceptance Criteria:**
- AC 3.4.1: Users can navigate without training
- AC 3.4.2: UI adapts to screen sizes 768px and above
- AC 3.4.3: All interactive elements keyboard accessible
- AC 3.4.4: Loading states prevent user confusion

---

### 3.5 Compatibility

#### 3.5.1 Browser Support
- Chrome 90+ (primary)
- Edge 90+
- Firefox 88+
- Safari 14+

#### 3.5.2 Device Support
- Desktop computers (Windows, macOS, Linux)
- Tablets (iPad, Android tablets)
- Webcam required for real-time features

**Acceptance Criteria:**
- AC 3.5.1: Core features work in all supported browsers
- AC 3.5.2: Webcam access works across browsers
- AC 3.5.3: TensorFlow.js models load successfully
- AC 3.5.4: Video playback works without codec issues

---

## 4. Technical Requirements

### 4.1 Technology Stack

#### 4.1.1 Frontend
- Next.js 13+ with App Router
- React 19
- TypeScript 5.7+
- Tailwind CSS for styling
- Framer Motion for animations

#### 4.1.2 AI/ML Libraries
- Google Generative AI SDK (@google/generative-ai)
- TensorFlow.js (@tensorflow/tfjs)
- BlazeFace model for face detection
- MoveNet model for pose detection

#### 4.1.3 Backend Services
- Supabase for authentication and database
- Vercel Blob for video storage (optional)
- Resend API for email notifications
- OpenAI API for chat assistant

#### 4.1.4 Additional Libraries
- Radix UI for accessible components
- Chart.js / Recharts for data visualization
- date-fns for date formatting

**Acceptance Criteria:**
- AC 4.1.1: All dependencies install without conflicts
- AC 4.1.2: Build process completes successfully
- AC 4.1.3: Production bundle size under 2MB (excluding videos)

---

### 4.2 Environment Configuration

#### 4.2.1 Required Environment Variables
- `GEMINI_API_KEY`: Google Gemini API key
- `NEXT_PUBLIC_SUPABASE_URL`: Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Supabase anonymous key
- `RESEND_API_KEY`: Resend email service key
- `OPENAI_API_KEY`: OpenAI API key for chat assistant

**Acceptance Criteria:**
- AC 4.2.1: Application detects missing environment variables
- AC 4.2.2: Clear error messages for misconfigured variables
- AC 4.2.3: Environment variables documented in setup guide

---

### 4.3 Data Models

#### 4.3.1 Timestamp Interface
```typescript
interface Timestamp {
  timestamp: string;        // Format: "MM:SS"
  description: string;      // Event description
  isDangerous?: boolean;    // Danger classification
}
```

#### 4.3.2 SavedVideo Interface
```typescript
interface SavedVideo {
  id: string;               // Unique identifier
  name: string;             // User-assigned name
  url: string;              // Video URL (blob or remote)
  thumbnailUrl: string;     // Thumbnail URL
  timestamps: Timestamp[];  // Detected events
}
```

#### 4.3.3 VideoEvent Interface
```typescript
interface VideoEvent {
  description: string;      // Event description
  isDangerous: boolean;     // Danger flag
}
```

---

## 5. Integration Requirements

### 5.1 Google Gemini API
- API key configuration
- Rate limit handling (requests per minute)
- Image format: JPEG base64 encoded
- Prompt engineering for event detection

### 5.2 Supabase Integration
- User authentication flows
- Database schema for user data
- Row-level security policies
- Real-time subscriptions (future)

### 5.3 Resend Email Service
- Email template configuration
- Sender domain verification
- Delivery status tracking
- Bounce handling

### 5.4 OpenAI API
- Chat completion endpoint
- Context window management
- Response streaming (optional)
- Token usage optimization

**Acceptance Criteria:**
- AC 5.1: All API integrations handle rate limits gracefully
- AC 5.2: API errors logged for debugging
- AC 5.3: Fallback behavior when APIs unavailable
- AC 5.4: API costs monitored and optimized

---

## 6. Future Enhancements (Out of Scope)

### 6.1 Advanced AI Features
- Person identification and recognition
- Object tracking across multiple cameras
- Behavioral pattern analysis
- Predictive threat detection

### 6.2 Enhanced Security
- End-to-end encryption for video data
- GDPR compliance tools
- Advanced access control (roles, permissions)
- Audit logging

### 6.3 Smart Home Integration
- Integration with smart home platforms
- Automated response actions (lock doors, trigger alarms)
- Voice assistant compatibility (Alexa, Google Home)

### 6.4 Mobile Application
- Native iOS and Android apps
- Push notifications
- Mobile-optimized UI
- Offline mode

### 6.5 Multi-Camera Support
- Monitor multiple camera feeds simultaneously
- Camera grouping and zones
- Centralized dashboard
- Cross-camera tracking

---

## 7. Constraints & Assumptions

### 7.1 Constraints
- Browser-based application (no native desktop app)
- Client-side video processing (limited by device capabilities)
- LocalStorage size limits (typically 5-10MB)
- API rate limits from third-party services
- Webcam required for real-time features

### 7.2 Assumptions
- Users have modern browsers with WebRTC support
- Users grant webcam and microphone permissions
- Stable internet connection for API calls
- Users understand basic security monitoring concepts
- Video files in standard formats (MP4, WebM)

---

## 8. Success Metrics

### 8.1 Performance Metrics
- Event detection accuracy: >85%
- False positive rate: <15%
- Average frame analysis time: <3 seconds
- UI response time: <200ms for user interactions

### 8.2 User Engagement Metrics
- Daily active users
- Average session duration
- Videos analyzed per user
- Alert response time

### 8.3 System Reliability Metrics
- Uptime: >99.5%
- Error rate: <1%
- API success rate: >98%
- Browser crash rate: <0.1%

---

## 9. Glossary

- **Bounding Box**: Rectangle drawn around detected objects (faces, persons)
- **Keypoint**: Specific body part location in pose detection (e.g., nose, elbow, knee)
- **Frame**: Single image extracted from video stream
- **Timestamp**: Time marker indicating when an event occurred (MM:SS format)
- **Dangerous Event**: Security incident requiring immediate attention
- **Real-time Analysis**: Processing video as it's being recorded
- **Batch Analysis**: Processing pre-recorded video files
- **ML Model**: Machine learning model (BlazeFace, MoveNet, Gemini)
- **VLM**: Visual Language Model (Gemini)

---

## 10. Document History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | 2026-02-10 | AI Assistant | Initial requirements document |

---

## 11. Approval

This requirements document requires approval from:
- [ ] Product Owner
- [ ] Technical Lead
- [ ] Security Team
- [ ] Stakeholders

---

**End of Requirements Document**
