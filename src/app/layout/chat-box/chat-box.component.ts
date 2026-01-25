import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-chat-box',
    templateUrl: './chat-box.component.html',
    styleUrls: ['./chat-box.component.scss'],
})
export class ChatBoxComponent implements OnInit {
    @Input() user: any; // Nhận thông tin user từ component cha
    messages: { sender: string; text: string }[] = [];
    newMessage: string = '';

    constructor() {}

    ngOnInit(): void {}

    sendMessage() {
        if (this.newMessage.trim()) {
            this.messages.push({ sender: 'Me', text: this.newMessage });
            this.newMessage = ''; // Reset input
        }
    }

    closeChat() {
        this.user = null; // Ẩn khung chat
    }
}
