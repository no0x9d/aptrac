_aptrac()
{
    local cur cmd
    COMPREPLY=()
    cur="${COMP_WORDS[COMP_CWORD]}"
    cmd="${COMP_WORDS[1]}"

    if [[ ${cur} == ${cmd} ]]; then
        local cmds= $(aptrac completion --cmd)
        COMPREPLY=( $(compgen -W "${cmds}" -- ${cur}) )
        return 0
    fi
    if [[ ${cur} == -* ]] ; then
        local opts= $(aptrac completion --op ${cmd})
        COMPREPLY=( $(compgen -W "${opts}" -- ${cur}) )
        return 0
    fi
    return 0
}
complete -F _aptrac aptrac