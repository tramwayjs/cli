import { 
    FileProvider,
    GulpProvider,
    ShellProvider,
    PackageManagementProvider,
} from "../../providers";

export default {
    "provider.file": {
        "class": FileProvider,
    },
    "provider.gulp": {
        "class": GulpProvider,
    },
    "provider.shell:package_management": {
        "class": ShellProvider,
        "constructor": [
            {"type": "parameter", "key": "shell_package_management"},
        ]
    },
    "provider.package_management:npm": {
        "class": PackageManagementProvider,
        "constructor": [
            {"type": "service", "key": "provider.shell:package_management"},
            {"type": "parameter", "key": "shell_npm"},
        ]
    },
}