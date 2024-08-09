import api from "./api";

export default class MoviesService {
  private axiosClient = api;

  async call(url: string, extra_params: object) {
    const response = await this.axiosClient.get(url, {
      params: {
        apikey: "60ee8d71",
        ...extra_params,
      },
    });
    return response;
  }

  async getMovie(title: string) {
    const response = await this.call("", { t: title });
    if (response.status == 200) {
      return response.data;
    }
  }
}
