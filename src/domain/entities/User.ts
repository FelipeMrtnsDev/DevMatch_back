import bcrypt from "bcrypt";

export type UserType = 'DEV' | 'RH' | 'ADMIN';

interface UserProps {
  id: number;
  fullName: string;
  email: string;
  passwordHash: string;
  userType: UserType;
  createdAt: Date;
  picture?: string | null;
}

export class User {
  public readonly id: number;
  public readonly fullName: string;
  public readonly email: string;
  private readonly passwordHash: string;
  public readonly userType: UserType;
  public readonly createdAt: Date;
  public readonly picture?: string | null;

  constructor(props: UserProps) {
    this.id = props.id;
    this.fullName = props.fullName;
    this.email = props.email;
    this.passwordHash = props.passwordHash;
    this.userType = props.userType;
    this.createdAt = props.createdAt;
    this.picture = props.picture ?? null;
  }

  async isPasswordValid(plainPassword: string): Promise<boolean> {
    return bcrypt.compare(plainPassword, this.passwordHash);
  }

  public getPublicProfile() {
    return {
      id: this.id,
      fullName: this.fullName,
      email: this.email,
      userType: this.userType,
      picture: this.picture,
      createdAt: this.createdAt,
    };
  }
}
