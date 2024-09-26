{ pkgs }: {
    deps = [
      pkgs.nano
      pkgs.cliquer
      pkgs.gradle
        pkgs.graalvm17-ce
        pkgs.maven
        pkgs.replitPackages.jdt-language-server
        pkgs.replitPackages.java-debug
    ];
}