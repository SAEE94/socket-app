import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subscription } from 'rxjs';
import { SocketService } from 'src/app/feature/services/socket.service';

@Injectable()
export class UserSocketService {

    constructor(private socketService: SocketService) { }

    public listenUserCreated(subscription: Subscription, callback) {
        setTimeout(() => {
            const sub = this.socketService.listenUserCreated('/socket/user-created', callback);
            subscription.add(sub);
        }, 3000);
    }

    public listenUserDeleted(subscription: Subscription, callback) {
        setTimeout(() => {
            const sub = this.socketService.listenUserCreated('/socket/user-deleted', callback);
            subscription.add(sub);
        }, 3000)
    }
}