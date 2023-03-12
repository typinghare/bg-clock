/**
 * Player role.
 */
export class Role {
    public static readonly A: Role = new Role('A');
    public static readonly B: Role = new Role('B');

    /**
     * Switches a role.
     * @param role
     */
    public static switch(role: Role): Role {
        if (role === Role.A) return Role.B;
        if (role === Role.B) return Role.A;

        throw new Error('The role given is undefined.');
    }

    private readonly _role: string;

    private constructor(role: string) {
        this._role = role;
    }

    public toString(): string {
        return this._role;
    }
}