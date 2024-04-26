export class SearchUtils {
  static insensitive(search: string, value: string) {
    return value.toLowerCase().includes(search.toLowerCase());
  }
}
