import { supabase } from "../integrations/supabase/client.js";

const SESSION_ID_KEY = 'analytics_session_id';

export function getSessionId() {
  let sessionId = sessionStorage.getItem(SESSION_ID_KEY);
  if (!sessionId) {
    sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    sessionStorage.setItem(SESSION_ID_KEY, sessionId);
  }
  return sessionId;
}

export async function trackEvent(
  eventType,
  route,
  meta
) {
  try {
    const sessionId = getSessionId();
    
    await supabase.functions.invoke('track-analytics', {
      body: {
        event_type: eventType,
        route: route || window.location.pathname,
        meta: {
          ...meta,
          session_id: sessionId,
        },
      },
    });
  } catch (error) {
    console.error('Failed to track event:', error);
  }
}

export async function trackPageView(route) {
  await trackEvent('page_view', route);
}

export async function trackAIGeneration(selections) {
  await trackEvent('ai_generation', '/patiodesigner', {
    selections,
  });
}

export async function trackButtonClick(buttonName, route) {
  await trackEvent('button_click', route, {
    button: buttonName,
  });
}
