declare module 'wpmjs' {

  interface ImportMap {
    [key: string]: string | {
      url?: string;
      global?: string;
      moduleType?: string;
      packageName?: string;
      packageQuery?: string;
      packageVersion?: string;
      packageFilename?: string;
      strictVersion?: boolean;
      shareScope?: string;
    };
  }

  interface RequestObject {
    name: string;
    version: string;
    filename: string;
    entry: string;
    query: string;
    baseUrl: string;
  }

  class Wpmjs {
    constructor(options?: { name?: string });

    setConfig(config: {
      baseUrl: string;
      defaultModuleType(name: string): string;
      defaultVersion(name: string): string;
      defaultImportMap(name: string): Map<string, any>;
      defaultGlobal(params: { name: string; version: string }): string;
    }): void;

    addImportMap(importMap: ImportMap): void;

    import(request: string): Promise<any>;

    get(request: string): any;

    setShared(sharedModule: {
      name: string;
      version: string;
      get: () => Promise<any>;
      loaded?: boolean | number;
      shareScope?: string;
      fromType?: string;
      from?: string;
    }): void;

    getShared(options: { name: string; strictVersion?: boolean; singleton?: boolean; shareScope?: string; requiredVersion?: string }): Promise<any>;

    sleep(promise: Promise<any>): Promise<any>;

    System: {
      import(request: string): Promise<any>;
    };

    registerLoader(loader: {
      moduleType: string;
      resolveUrl: (options: RequestObject) => string;
      resolveContainer: (url: string, options: { requestObj: RequestObject; pkgConfig: ImportMap }) => any;
      resolveEntry: (container: any, entry: string) => any;
    }): void;

    debug(options: { baseUrl: string; plugins: Array<string> }): void;
  }

  const wpmjs: Wpmjs;
  const debugWpmjs: Wpmjs;

  global.wpmjs = global.wpmjs || wpmjs
  global.debugWpmjs = debugWpmjs

  export = wpmjs;
}