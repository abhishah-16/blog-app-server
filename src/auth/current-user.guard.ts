import { ExecutionContext } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

export class currentUserGuard extends AuthGuard('jwt') {
    handleRequest(err: any, user: any) {
        if (user) {
            return user
        }
        return null
    }
}