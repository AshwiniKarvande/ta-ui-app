import axiosBaseUrl from "../components/AxiosConfig";

const getAll = () => {
  return axiosBaseUrl.get("/symbol-infos");
};

const get = (id) => {
  return axiosBaseUrl.get(`/symbol-infos/${id}`);
};

const create = (data) => {
  return axiosBaseUrl.post("/symbol-infos", data);
};

const update = (id, data) => {
  return axiosBaseUrl.put(`/symbol-infos/${id}`, data);
};

const remove = (id) => {
  return axiosBaseUrl.delete(`/symbol-infos/${id}`);
};

const findBySymbol = (symbol) => {
  return axiosBaseUrl.get(`/symbol-infos?symbol=${symbol}`);
};

const SymbolService = {
  getAll,
  get,
  create,
  update,
  remove,
  findBySymbol,
};

export default SymbolService;