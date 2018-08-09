import { 
    ModuleGenerationService,
    DirectoryResolver,
    BuildService,
    InstallService,
    ServiceLibraryResolver,
    ServerService,
} from "../../services";

export default {
    "service.module_generation": {
        "class": ModuleGenerationService,
        "constructor": [
            {"type": "parameter", "key": "format"},
        ]
    },
    "service.directory_resolver": {
        "class": DirectoryResolver,
        "constructor": [
            {"type": "parameter", "key": "location"},
        ]
    },
    "service.build": {
        "class": BuildService,
        "constructor": [
            {"type": "service", "key": "provider.gulp"},
        ]
    },
    "service.install:npm": {
        "class": InstallService,
        "constructor": [
            {"type": "service", "key": "provider.package_management:npm"},
            {"type": "service", "key": "service.service_library_resolver"},
        ]
    },
    "service.service_library_resolver": {
        "class": ServiceLibraryResolver,
        "constructor": [
            {"type": "parameter", "key": "libraries"},
        ]
    },
    "service.server": {
        "class": ServerService,
        "constructor": [
            {"type": "service", "key": "provider.gulp"},
            {"type": "service", "key": "service.build"},
        ]
    },
}