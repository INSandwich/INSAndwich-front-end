export class NotifService {

  private notificationElement: any;

  setNotifElement(notifElement: any) {
    this.notificationElement = notifElement;
  }

  open(title: string, message: string, success: boolean, timeout: number = 5000) {
    this.notificationElement.open(title, message, success);
    setTimeout(() => { this.notificationElement.close(); }, timeout);
  }


}
