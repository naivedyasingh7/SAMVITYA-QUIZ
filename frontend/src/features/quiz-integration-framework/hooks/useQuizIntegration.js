import { useState, useEffect, useCallback } from 'react';
import { launchService } from '../services/launchService.js';
import { quizService } from '../services/quizService.js';
import { providerRegistry } from '../providers/providerRegistry.js';
import { mockProviderService } from '../../../../../backend/services/quiz/mockProviderService.js';

export function useQuizIntegration() {
  const [activeAttempt, setActiveAttempt] = useState(null);
  const [selectedProvider, setSelectedProvider] = useState('mock');
  const [providers, setProviders] = useState([]);
  const [history, setHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [lastIngestion, setLastIngestion] = useState(null);

  // Load available providers and history on mount
  const refreshHistory = useCallback(async () => {
    try {
      const records = await quizService.getIngestionHistory();
      setHistory(records || []);
    } catch (err) {
      console.warn('Could not load ingestion history:', err);
    }
  }, []);

  useEffect(() => {
    setProviders(providerRegistry.list());
    refreshHistory();
  }, [refreshHistory]);

  /**
   * Generates a tracked launch link for a participant and activity.
   */
  const generateLaunchLink = async ({ participantId, activityId, config = {} }) => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await launchService.launchQuiz({
        participantId,
        activityId,
        providerName: selectedProvider,
        config
      });
      setActiveAttempt(res.data);
      return res.data;
    } catch (err) {
      const msg = err.message || 'Failed to generate quiz launch link';
      setError(msg);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Ingests a raw or normalized quiz result.
   */
  const ingestResult = async (rawPayload, providerName = selectedProvider, activityConfig = null) => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await quizService.ingestResult(rawPayload, providerName, activityConfig);
      setLastIngestion(res);
      if (activeAttempt && activeAttempt.attempt_id === res.data.attempt_id) {
        setActiveAttempt((prev) => ({ ...prev, status: 'completed' }));
      }
      await refreshHistory();
      return res;
    } catch (err) {
      const msg = err.message || 'Failed to ingest quiz result';
      setError(msg);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Simulates a mock participant quiz submission in one click.
   */
  const simulateMockCompletion = async ({
    participantId,
    activityId,
    attemptId,
    score = 85,
    maxScore = 100,
    activityConfig = null
  }) => {
    setIsLoading(true);
    setError(null);
    try {
      const mockResult = mockProviderService.createMockResult({
        participant_id: participantId,
        activity_id: activityId,
        attempt_id: attemptId || activeAttempt?.attempt_id,
        score,
        max_score: maxScore
      });

      const res = await ingestResult(mockResult, 'mock', activityConfig);
      return res;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const clearAttempt = () => setActiveAttempt(null);
  const clearError = () => setError(null);

  return {
    activeAttempt,
    setActiveAttempt,
    selectedProvider,
    setSelectedProvider,
    providers,
    history,
    isLoading,
    error,
    lastIngestion,
    generateLaunchLink,
    ingestResult,
    simulateMockCompletion,
    refreshHistory,
    clearAttempt,
    clearError
  };
}
