import bcrypt from "bcrypt";

export type UserType = 'DEV' | 'RH' | 'ADMIN';

interface UserProps {
  id: string;
  fullName: string;
  email: string;
  passwordHash: string;
  userType: UserType;
  createdAt: Date;
  picture?: string | null;
}

export class User {
  public readonly id: string;
  public fullName: string;
  public email: string;
  private passwordHash: string;
  public readonly userType: UserType;
  public readonly createdAt: Date;
  public  picture?: string | null;

  constructor(props: UserProps) {
    this.id = props.id;
    this.fullName = props.fullName;
    this.email = props.email;
    this.passwordHash = props.passwordHash;
    this.userType = props.userType;
    this.createdAt = props.createdAt;
    this.picture = props.picture ?? null;
  }

  public updateFullName(newName: string) {
    this.fullName = newName;
  }

  public updatePicture(newPicture: string) {
    this.picture = newPicture;
  }

  public get getPasswordHash(): string {
    return this.passwordHash;
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
