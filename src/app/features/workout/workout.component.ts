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


  ngOnInit(): void {

    this._observable.workoutApi.subscribe((res: any) => {
        // this.exercises.push(res.data);
        this.exercises = res.data;
      console.log(this.exercises);
    });

    // this.exercises = [
    //   {
    //     _id: '696f1d679d7d7cb4096a30cc',
    //     name: '3/4 Sit-Up',
    //     force: 'pull',
    //     equipment: 'body only',
    //     primaryMuscles: ['abdominals'],
    //     instructions: [
    //       'Lie down on the floor and secure your feet.',
    //       'Place your hands behind your head.',
    //       'Raise your torso toward your knees.',
    //       'Reverse the motion ¾ of the way down.',
    //       'Repeat for reps.'
    //     ],
    //     images: [
    //       'assets/workout_imgs/3_4_Sit-Up/0.jpg',
    //       'assets/workout_imgs/3_4_Sit-Up/1.jpg'
    //     ]
    //   }
    // ];
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
