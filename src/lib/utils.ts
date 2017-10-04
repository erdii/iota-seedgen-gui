import { execFile } from "child_process";
import { arch, platform } from "os";
import { resolve } from "path";

function getOsArchTuple() {
    const bits = (() => {
        switch (arch()) {
            case "x64": return "64bit";
            case "x86": return "32bit";
            default: throw new Error("EARCHNOTSUPPORTED");
        }
    })();

    const os = (() => {
        switch (platform()) {
            case "darwin": return "mac";
            case "linux": return "linux";
            case "win32": return "win";
            default: throw new Error("EOSNOTSUPPORTED");
        }
    })();

    return `${os}-${bits}${platform() === "win32" ? ".exe" : ""}`;
}

function getExecutablePath() {
    const isDevelopment = process.env.NODE_ENV === "development";

    if (isDevelopment) {
        return resolve(process.cwd(), "bin", `iota-seedgen_${getOsArchTuple()}`);
    } else {
        return resolve((process as any).resourcesPath, "bin", `iota-seedgen_${getOsArchTuple()}`);
    }
}

export function generateSeed() {
    return new Promise<string>((resolve, reject) => {
        execFile(getExecutablePath(), ["-s"], (err, stdout, stderr) => {
            if (err) {
                reject(err.message || stderr);
                return;
            }

            resolve(stdout);
        });
    });
}

export function sleep(millis) {
    return new Promise(resolve => {
        setTimeout(() => resolve(), millis);
    });
}

export function isOSX() {
    return platform() == "darwin";
}
