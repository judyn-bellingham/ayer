import { useState, useCallback } from 'react';
import type { Experience, Category, Checkpoint, TabId } from './lib/types';
import { useExperiences } from './lib/hooks';
import { checkpointToExperience } from './lib/checkpoints';
import { BottomNav } from './components/BottomNav';
import { ExperienceSheet } from './components/ExperienceSheet';
import { CheckpointCard } from './components/CheckpointCard';
import { HomeScreen } from './screens/HomeScreen';
import { ExploreScreen } from './screens/ExploreScreen';
import { RouteScreen } from './screens/RouteScreen';
import { ProfileScreen } from './screens/ProfileScreen';

function App() {
  const [activeTab, setActiveTab] = useState<TabId>('home');
  const [selectedExperience, setSelectedExperience] = useState<Experience | null>(null);
  const [selectedCheckpoint, setSelectedCheckpoint] = useState<Checkpoint | null>(null);
  const [route, setRoute] = useState<Experience[]>([]);
  const [favorites, setFavorites] = useState<Experience[]>([]);
  const [exploreCategory, setExploreCategory] = useState<Category | 'all'>('all');

  const { experiences, loading } = useExperiences();

  const handleAddExperienceToRoute = useCallback((exp: Experience) => {
    setRoute((prev) => {
      if (prev.some((e) => e.id === exp.id)) return prev;
      return [...prev, exp];
    });
    setFavorites((prev) => {
      if (prev.some((e) => e.id === exp.id)) return prev;
      return [...prev, exp];
    });
  }, []);

  const handleAddCheckpointToRoute = useCallback((cp: Checkpoint) => {
    const exp = checkpointToExperience(cp);
    setRoute((prev) => {
      if (prev.some((e) => e.id === exp.id)) return prev;
      return [...prev, exp];
    });
    setFavorites((prev) => {
      if (prev.some((e) => e.id === exp.id)) return prev;
      return [...prev, exp];
    });
  }, []);

  const handleRemoveFromRoute = useCallback((id: string) => {
    setRoute((prev) => prev.filter((e) => e.id !== id));
  }, []);

  const handleClearRoute = useCallback(() => {
    setRoute([]);
  }, []);

  const handleReorderRoute = useCallback((newRoute: Experience[]) => {
    setRoute(newRoute);
  }, []);

  const handleCategorySelect = useCallback((cat: Category) => {
    setExploreCategory(cat);
    setActiveTab('explore');
  }, []);

  const isInRoute = selectedExperience
    ? route.some((e) => e.id === selectedExperience.id)
    : false;

  const isCheckpointInRoute = selectedCheckpoint
    ? route.some((e) => e.id === selectedCheckpoint.id)
    : false;

  return (
    <div className="min-h-screen navy-gradient">
      <div className="min-h-screen max-w-md mx-auto relative">
        {activeTab === 'home' && (
          <HomeScreen
            experiences={experiences}
            loading={loading}
            onSelectExperience={setSelectedExperience}
            onNavigate={setActiveTab}
            onCategorySelect={handleCategorySelect}
          />
        )}

        {activeTab === 'explore' && (
          <ExploreScreen
            experiences={experiences}
            loading={loading}
            onSelectExperience={setSelectedExperience}
            onSelectCheckpoint={setSelectedCheckpoint}
            activeCheckpointId={selectedCheckpoint?.id ?? null}
            initialCategory={exploreCategory}
          />
        )}

        {activeTab === 'route' && (
          <RouteScreen
            route={route}
            onRemove={handleRemoveFromRoute}
            onClear={handleClearRoute}
            onNavigate={setActiveTab}
            onSelectExperience={setSelectedExperience}
            onReorder={handleReorderRoute}
          />
        )}

        {activeTab === 'profile' && (
          <ProfileScreen
            favorites={favorites}
            routeCount={route.length}
            onSelectExperience={setSelectedExperience}
          />
        )}

        <BottomNav active={activeTab} onChange={setActiveTab} routeCount={route.length} />

        <ExperienceSheet
          experience={selectedExperience}
          onClose={() => setSelectedExperience(null)}
          onAddToRoute={handleAddExperienceToRoute}
          isInRoute={isInRoute}
        />

        <CheckpointCard
          checkpoint={selectedCheckpoint}
          onClose={() => setSelectedCheckpoint(null)}
          onAddToRoute={handleAddCheckpointToRoute}
          isInRoute={isCheckpointInRoute}
        />
      </div>
    </div>
  );
}

export default App;
