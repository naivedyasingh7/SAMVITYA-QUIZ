-- Initial Seed Data for Event Points Management System

-- Insert default quiz providers
INSERT INTO public.quiz_providers (id, name, adapter_class, is_enabled)
VALUES
  ('mock', 'Mock Simulator Provider', 'MockQuizProvider', TRUE),
  ('kahoot', 'Kahoot Challenge', 'KahootProvider', FALSE),
  ('wayground', 'Wayground Quiz Hub', 'WaygroundProvider', FALSE)
ON CONFLICT (id) DO NOTHING;

-- Insert sample activities
INSERT INTO public.activities (id, title, description, activity_type, max_points, is_active)
VALUES
  ('11111111-1111-1111-1111-111111111111', 'General Tech Trivia', 'Fast-paced tech trivia quiz', 'online_quiz', 1000, TRUE),
  ('22222222-2222-2222-2222-222222222222', 'Robotics Obstacle Course', 'Navigate physical robot course', 'offline_game', 500, TRUE)
ON CONFLICT (id) DO NOTHING;
