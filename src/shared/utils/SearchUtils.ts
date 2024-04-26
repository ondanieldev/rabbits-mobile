export class SearchUtils {
  static matchesInsensitve(search: string, value: string) {
    return value.toLowerCase().includes(search.toLowerCase());
  }
}
