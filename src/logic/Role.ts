export class Role {
    public static readonly A: Role = new Role('A');
    public static readonly B: Role = new Role('B');

    private readonly _role: string;

    private constructor(role: string) {
        this._role = role;
    }

    public toString(): string {
        return this._role;
    }
}