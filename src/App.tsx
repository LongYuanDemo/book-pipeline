import { useState } from 'react';
import type { ViewType } from '@book/data/bookInfo.ts';
import AppShell from './components/AppShell.tsx';
import Home from './pages/Home.tsx';
import Anki from './pages/Anki.tsx';
import AudioCourse from './pages/AudioCourse.tsx';
import MindMap from './pages/MindMap.tsx';
import Checklist from './pages/Checklist.tsx';
import ChecklistDetail from './pages/ChecklistDetail.tsx';
import Agent from './pages/Agent.tsx';
import BookToSkill from './pages/BookToSkill.tsx';
import AudioCoursePlayer from './pages/AudioCoursePlayer.tsx';
import Profile from './pages/Profile.tsx';
import ChapterContent from './pages/ChapterContent.tsx';

export default function App() {
  const [view, setView] = useState<ViewType>('home');
  const [selectedChecklistId, setSelectedChecklistId] = useState<string | null>(null);
  const [selectedAudioLessonId, setSelectedAudioLessonId] = useState<string | null>(null);
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);

  const navigate = (next: ViewType) => {
    if (next === 'checklist') setSelectedChecklistId(null);
    if (next !== 'audio-player') setSelectedAudioLessonId(null);
    setView(next);
  };

  const openChecklist = (id: string) => {
    setSelectedChecklistId(id);
    setView('checklist-detail');
  };

  const openAudioPlayer = (id: string) => {
    setSelectedAudioLessonId(id);
    setView('audio-player');
  };

  const openTask = (taskId: string) => {
    setSelectedTaskId(taskId);
    setView('chapter-content');
  };

  const isFullWidth = view === 'home' || view === 'agent' || view === 'chapter-content' || view === 'mindmap' || view === 'book-skill';

  return (
    <>
      {view === 'audio-player' && selectedAudioLessonId ? (
        <AudioCoursePlayer
          lessonId={selectedAudioLessonId}
          onBack={() => navigate('audio')}
          onChangeLesson={(id) => setSelectedAudioLessonId(id)}
        />
      ) : (
        <AppShell active={view} onNavigate={navigate} fullWidth={isFullWidth}>
          {view === 'home' && <Home onNavigate={navigate} openTask={openTask} />}
          {view === 'anki' && <Anki onBack={() => navigate('home')} />}
          {view === 'audio' && <AudioCourse onBack={() => navigate('home')} onOpenPlayer={openAudioPlayer} />}
          {view === 'mindmap' && <MindMap onBack={() => navigate('home')} />}
          {view === 'checklist' && <Checklist onBack={() => navigate('home')} onOpen={openChecklist} />}
          {view === 'checklist-detail' && selectedChecklistId && (
            <ChecklistDetail id={selectedChecklistId} onBack={() => setView('checklist')} />
          )}
          {view === 'chapter-content' && selectedTaskId && (
            <ChapterContent taskId={selectedTaskId} onBack={() => navigate('home')} onNavigateTask={openTask} />
          )}
          {view === 'agent' && <Agent />}
          {view === 'book-skill' && <BookToSkill />}
          {view === 'profile' && <Profile />}
        </AppShell>
      )}
    </>
  );
}
