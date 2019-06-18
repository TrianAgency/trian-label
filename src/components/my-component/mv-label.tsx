import { Component, Prop, State, h } from "@stencil/core";

export interface IUser {
  username: string;
  email: string;
  [key: string]: any;
}

@Component({
  tag: "mv-label",
  styleUrl: "mv-label.css",
  shadow: true
})
export class MyComponent {
  @Prop() userId: number = 3;
  @Prop() status: string = '';
  @Prop() title: string = 'Def Title';
  @Prop() user: IUser;

  @State() count: number = 0;

  componentWillLoad() {
    this.getUser(this.userId);
  }

  private incCount() {
    console.log(this.count, typeof this.count);
    this.count = this.count + 1;
    console.log(this.count, typeof this.count);
  }

  private getStatus(): string {
    return this.status && ` (Status: ${this.status.toUpperCase()})`;
  }

  private handlerClick() {
    console.log(this);
    console.log(this.userId, typeof this.userId);
    console.log(this.count, typeof this.count);
    const reqId = this.userId + this.count;
    if (reqId > 10) {
      this.user = { ...this.user, username: '' };
      return true;
    }
    this.getUser(reqId);
  }

  public getUser(reqId): Promise<void> {
    return fetch(`https://jsonplaceholder.typicode.com/users/${reqId}`)
      .then(response => response.json())
      .then(data => {
        this.user = data;
        this.incCount();
      });
  }

  render() {
    return this.user && (<div class="mv-label">
      <h1>{this.title}{this.getStatus()}</h1>
      <h2><button onClick={this.handlerClick.bind(this)}>Next User</button></h2>
      {this.user.username &&
        <div><h3>Login: {this.user.username}</h3>
          <h3>Email: {this.user.email}</h3></div>
      }
      {!this.user.username && <h2>No else Users</h2>}
      <div>
        <slot />
      </div>
    </div>);
  }
}
