DIR=../../dist
if [ -d "$DIR" ]; then
    printf '%s\n' "Removing ($DIR)"
    rm -rf "$DIR"
fi
