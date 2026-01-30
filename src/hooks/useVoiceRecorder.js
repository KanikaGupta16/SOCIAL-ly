import { useState, useRef, useEffect } from 'react';
import { createClient, LiveTranscriptionEvents } from '@deepgram/sdk';

const useVoiceRecorder = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState('');
  const mediaRecorderRef = useRef(null);
  const connectionRef = useRef(null);

  useEffect(() => {
    // Cleanup on unmount
    return () => {
      stopRecording();
    };
  }, []);

  const startRecording = async () => {
    try {
      console.log('Requesting microphone access...');
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      console.log('Microphone access granted');
      
      const apiKey = import.meta.env.VITE_DEEPGRAM_API_KEY;
      if (!apiKey) {
        console.error('Deepgram API Key is missing. Check your .env file.');
        alert('Deepgram API Key is missing. Check console for details.');
        return;
      }

      console.log('Initializing Deepgram client...');
      const deepgram = createClient(apiKey);
      
      const connection = deepgram.listen.live({
        model: "nova-2",
        language: "en-US",
        smart_format: true,
      });

      connection.on(LiveTranscriptionEvents.Open, () => {
        console.log('Deepgram connection opened');
        
        connection.on(LiveTranscriptionEvents.Transcript, (data) => {
          const newTranscript = data.channel.alternatives[0].transcript;
          if (newTranscript) {
            console.log('Transcript received:', newTranscript);
            setTranscript((prev) => (prev + ' ' + newTranscript).trim());
          }
        });
        
        connection.on(LiveTranscriptionEvents.Error, (err) => {
          console.error('Deepgram connection error:', err);
        });
        
        connection.on(LiveTranscriptionEvents.Close, () => {
          console.log('Deepgram connection closed');
        });

        mediaRecorderRef.current = new MediaRecorder(stream);
        mediaRecorderRef.current.ondataavailable = (event) => {
          if (event.data.size > 0 && connection.getReadyState() === 1) {
            connection.send(event.data);
          }
        };
        mediaRecorderRef.current.start(250);
        console.log('MediaRecorder started');
        setIsRecording(true);
      });
      
      connection.on(LiveTranscriptionEvents.Error, (err) => {
          console.error('Deepgram initialization error:', err);
      });

      connectionRef.current = connection;

    } catch (error) {
      console.error('Error starting recording:', error);
      alert(`Error starting recording: ${error.message}`);
    }
  };

  const stopRecording = () => {
    console.log('Stopping recording...');
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop();
      // Stop all tracks to release microphone
      if (mediaRecorderRef.current.stream) {
         mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
      }
      console.log('MediaRecorder stopped');
    }
    
    if (connectionRef.current) {
      // Check if finish method exists before calling
      if (typeof connectionRef.current.finish === 'function') {
         connectionRef.current.finish();
      }
      connectionRef.current = null;
      console.log('Deepgram connection finished');
    }
    setIsRecording(false);
  };

  return { isRecording, transcript, startRecording, stopRecording };
};

export default useVoiceRecorder;
