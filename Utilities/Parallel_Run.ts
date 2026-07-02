async function getTimestamp(aa: string) {
    const date = new Date();
    console.log(`${aa} ${date.getDate()} ${date.getMonth() + 1}/${date.getFullYear()}`);
    await delay(100)
}

async function delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function perform_loop(reference: string) {
    for (let i = 0; i < 100; i++) {
        let ans = await getTimestamp(reference);
        console.log(`${ans}`)
    }
}


async function parallel_run() {

}
