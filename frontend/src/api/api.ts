export class Api {
  constructor(private baseUrl = "http://localhost:3000/api/") {}

  async get(path: string, param?: { [key: string]: string }) {
    const queryParam = param
      ? "?" +
        Object.entries(param)
          .map((el) => {
            return `${el[0]}=${el[1]}`;
          })
          .join("&")
      : "";

    const request = await fetch(this.baseUrl + path + queryParam);
    return await request.json();
  }

  async post(path: string, body: object) {
    const request = await fetch(this.baseUrl + path, {
      headers: { "Content-Type": "application/json;charset=utf-8" },
      body: JSON.stringify(body),
      method: "Post",
    });
    return await request.json();
  }

  async put(path: string, body: object) {
    const request = await fetch(this.baseUrl + path, {
      headers: { "Content-Type": "application/json;charset=utf-8" },
      body: JSON.stringify(body),
      method: "Put",
    });
    return await request.json();
  }

  async delete(path: string) {
    const request = await fetch(this.baseUrl + path, { method: "Delete" });
    return await request.json();
  }
}
export const api = new Api();
