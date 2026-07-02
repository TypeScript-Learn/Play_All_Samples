async function getTimestamp(aa: string) {
    const date = new Date();
    console.log(`${aa}  =  ${date.getTime().toString()}`);
    await delay(100)
}

async function delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function perform_loop(reference: string) {
    for (let i = 0; i < 10; i++) {
        let ans = await getTimestamp(reference);
        console.log(`${ans}`)
    }
}


async function parallel_run() {

    const variable_to_keep_all_parallel_methods=[];
    for (let i = 0; i < 10; i++) {
        variable_to_keep_all_parallel_methods.push(perform_loop(i.toString()));
    }

    const results = Promise.all(variable_to_keep_all_parallel_methods)

}
parallel_run();