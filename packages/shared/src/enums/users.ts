export const userRole = ["user", "admin"] as const;
export type UserRoleValues = typeof userRole;
export type UserRole = UserRoleValues[number];

export const userRolesValues = {
  USER: "user",
  ADMIN: "admin",
} as const satisfies Record<string, UserRole>;
