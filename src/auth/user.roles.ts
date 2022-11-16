import { RolesBuilder } from "nest-access-control";

export enum userRoles {
    Admin = 'Admin',
    Reader = 'Reader'
}
export const roles: RolesBuilder = new RolesBuilder()

roles.grant(userRoles.Reader)
    .readAny(['post'])
    .grant(userRoles.Admin)
    .extend(userRoles.Reader)
    .updateAny(['post'])
    .createAny(['post'])
    .deleteAny(['post'])