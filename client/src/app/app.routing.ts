import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { ProfileComponent } from './profile/profile.component';
import { TermsAndConditionsComponent } from './terms-and-conditions/terms-and-conditions.component';
import { DisclaimerComponent } from './disclaimer/disclaimer.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { EditChordsComponent } from './edit-chords/edit-chords.component';

export const routing: Routes = [
    {path: 'profile', component: ProfileComponent},
    {path: 'terms-and-conditions', component: TermsAndConditionsComponent},
    {path: 'disclaimer', component: DisclaimerComponent},
    {path: 'privacy-policy', component: PrivacyPolicyComponent},
    {path: 'profile/edit-chords', component: EditChordsComponent},
];

export const router: ModuleWithProviders = RouterModule.forRoot(routing);