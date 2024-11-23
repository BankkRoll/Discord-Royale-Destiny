// src\utils\permissions.ts

import { GuildMember, PermissionsBitField } from "discord.js";

/**
 * Checks if a member has admin permissions or a specified role for economy commands.
 *
 * @param member - The member to check. Can be undefined if not found.
 * @returns `true` if the member has the required permissions or role, otherwise `false`.
 */
export function hasAdminPermission(member: GuildMember | undefined): boolean {
  if (!member) return false;

  return member.permissions.has(PermissionsBitField.Flags.Administrator);
}
