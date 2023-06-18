import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Socket } from 'socket.io-client';

@Component({
  selector: 'app-chat-room',
  templateUrl: './chat-room.component.html',
  styleUrls: ['./chat-room.component.css']
})
export class ChatRoomComponent implements OnInit {
  chatRooms: string[] = [];
  socket!: Socket;
  username: string = 'Manikandan';
  chatRoom: string = 'My_chat_room_name';

  constructor(private http: HttpClient,private router: Router) {}
  ngOnInit() {
    this.fetchChatRooms();
  }

  fetchChatRooms() {
    this.http.get<any>('http://192.168.1.3:3000/chat-rooms')
    .subscribe(
      (response) =>{
        this.chatRooms = response.chatRooms;
      },
      (error) =>{
        console.error('Error fetching chat rooms:', error);
      }
    )
  }

  connectToChatRoom(chatRoom: string): void{
    localStorage.setItem('chatroom', chatRoom);
  }
}
