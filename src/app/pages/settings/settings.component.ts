import { Component } from '@angular/core';
import { SettingsService } from 'src/app/service/settings/settings.service';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent {

  // Global Objects
  Settings: any = {};

  constructor(private settingsService: SettingsService) {
    this.GetSettings();
  }

  GetSettings()
  {
    this.settingsService.FetchSettings()
    .subscribe((res:any)=>{
      if(res.status=="success")
      {
        if(res.data.length>0)
        {
          this.Settings = res.data[0];
        }
      }
    })    
  }

  UpdateSettings()
  {
    this.settingsService.SaveSettings(this.Settings.uid, this.Settings.CostPerMile)
    .subscribe((res:any)=>{
      if(res.status=="success")
      {
        Swal.fire("Settings Saved", "Settings saved succcessfully.", "success");
      }
      else
      {
        Swal.fire("Process Failed", "Error occured while saving settings.", "error");
        console.log(res);
      }
    })
  }

}
