import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/core/services/api.service';
import { ObservableService } from 'src/app/core/services/observable.service';

@Component({
  selector: 'app-workout',
  templateUrl: './workout.component.html',
  styleUrls: ['./workout.component.scss']
})
export class WorkoutComponent implements OnInit {

  exercises: any = [];
  activeImageIndex: Record<string, number> = {};
  filteredExercises: any = [];
  filters: any = {
    search: '',
    primarymuscle: 'all',
    secondarymuscle: 'all',
    equipment: 'all',
    level: 'all',
    force: 'all',
    mechanic: 'all'
  };
  muscles = [
    'chest', 'lats', 'shoulders', 'biceps', 'triceps',
    'quadriceps', 'hamstrings', 'glutes', 'calves', 'abdominals'
  ];

  constructor(private _api: ApiService, private _observable: ObservableService) {
    this._api.getAllWorkOutDataApi();
  }

  ngOnInit(): void {

    this._observable.workoutApi.subscribe((res: any) => {
      this.exercises = (res?.data || []).map((item: any) => {
        const firstImage = item.images?.length
          ? `assets/workout_imgs/${item.images[0]}`
          : 'assets/images/gym-bg.png';

        return {
          ...item,
          imgUrl: firstImage,
          fallbackImg: 'assets/images/gym-bg.png'
        };
      });

      console.log('Enriched exercises:', this.exercises);
      if (this.exercises && this.exercises.length > 0) {
        this.filteredExercises = this.exercises;
      } else {
        this.filteredExercises = [];
      }
    });
  }

  applyFilters() {
    this.filteredExercises = this.exercises.filter((ex: any) => {
      const matchesSearch =
        !this.filters.search ||
        ex.name.toLowerCase().includes(this.filters.search.toLowerCase());

      const matchesprimaryMuscle =
        this.filters.primarymuscle === 'all' ||
        ex.primaryMuscles.includes(this.filters.primarymuscle);

      const matchessecondaryMuscle =
        this.filters.secondarymuscle === 'all' ||
        ex.primaryMuscles.includes(this.filters.secondarymuscle);
      
      const matchesEquipment =
        this.filters.equipment === 'all' ||
        ex.equipment === this.filters.equipment;

      const matchesLevel =
        this.filters.level === 'all' ||
        ex.level === this.filters.level;

      const matchesForce =
        this.filters.force === 'all' ||
        ex.force === this.filters.force;

      const matchesMechanic =
        this.filters.mechanic === 'all' ||
        ex.mechanic === this.filters.mechanic;

      return (
        matchesSearch &&
        matchesprimaryMuscle &&
        matchessecondaryMuscle &&
        matchesEquipment &&
        matchesLevel &&
        matchesForce &&
        matchesMechanic
      );
    });
  }

  resetFilters() {
    this.filters = {
      search: '',
      primarymuscle: 'all',
      secondarymuscle: 'all',
      equipment: 'all',
      level: 'all',
      force: 'all',
      mechanic: 'all'
    };
    this.applyFilters();
  }

  getExerciseImage(ex: any): string {
    const index = this.activeImageIndex?.[ex._id] ?? 0;
    return `assets/workout_imgs/${ex.images[index]}`;
  }

  onImgError(event: Event) {
    const img = event.target as HTMLImageElement;
    img.src = 'assets/images/gym-bg.png';
    img.onerror = null;
  }

  capitalizeFirstLetter(string: any) {
    if (!string) {
      return ""; // Handles empty strings safely
    }
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  searchText: string = '';

  onSearch(event: Event) {
    const value = (event.target as HTMLInputElement).value
      .toLowerCase()
      .trim();
    console.log(value);

  }



  nextImage(id: string, total: number) {
    this.activeImageIndex[id] =
      ((this.activeImageIndex[id] || 0) + 1) % total;
  }

  prevImage(id: string) {
    this.activeImageIndex[id] =
      ((this.activeImageIndex[id] || 0) - 1 + 2) % 2;
  }

  addToProgramme(exercise: any) {
    console.log('Added:', exercise.name);
  }

}
