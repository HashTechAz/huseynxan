import Module from "node:module";
import path from "node:path";

const originalResolveFilename = Module._resolveFilename;
Module._resolveFilename = function resolveFilename(request, parent, isMain, options) {
  const mapped = request.startsWith("@/")
    ? path.join(import.meta.dirname, "..", "work", "test-build", "src", request.slice(2))
    : request;
  return originalResolveFilename.call(this, mapped, parent, isMain, options);
};
