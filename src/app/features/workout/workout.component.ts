import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/core/services/api.service';
import { ObservableService } from 'src/app/core/services/observable.service';

@Component({
  selector: 'app-workout',
  templateUrl: './workout.component.html',
  styleUrls: ['./workout.component.scss']
})
export class WorkoutComponent implements OnInit {
  constructor(private _api: ApiService, private _observable: ObservableService) {
    this._api.getAllWorkOutDataApi();
  }

  exercises: any = [];
  activeImageIndex: Record<string, number> = {};
filteredExercises:any =[]

 ngOnInit(): void {
  this._observable.workoutApi.subscribe((res: any) => {
    // Original exercises
    this.exercises = res.data || [];
    console.log('Original exercises:', this.exercises);

    // Map to add/rename properties if needed
    this.exercises = this.exercises.map((item: any) => ({
      // rename or copy fields if required
      name: item.name,           // already exists, can remove
      equipment: item.equipment  // corrected typo from 'equipeent'
    }));

    // Copy for filtering/searching
    this.filteredExercises = [...this.exercises];
    console.log('Filtered exercises:', this.filteredExercises);
  });
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
