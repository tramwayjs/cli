import { 
    FileProvider,
    ShellProvider,
    PackageManagementProvider,
} from "../../providers";

export default {
    "provider.file": {
        "class": FileProvider,
    },
    "provider.shell:package_management": {
        "class": ShellProvider,
        "constructor": [
            {"type": "parameter", "key": "shell_package_management"},
        ]
    },
    "provider.shell": {
        "class": ShellProvider,
    },
    "provider.shell:nodemon": {
        "class": ShellProvider,
        "constructor": [
            {"type": "parameter", "key": "shell_nodemon"},
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