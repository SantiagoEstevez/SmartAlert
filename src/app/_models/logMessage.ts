export class Message {

 constructor(
   public author?: string,
   public message?: string,
   public isMe?: boolean,
   public date?: Date,
   public destino?,
   public grupo?,
   public recibido?,
   public invitacion?,
   public privado?,
   public sistema?
 ) {
   this.author = author;
   this.message = message;
   this.isMe = isMe;
   this.date = date;
 }
}
