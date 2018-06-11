import { TapBark } from "tap-bark";
import { TestSet, TestRunner } from "alsatian";

(async () =>
{
    const testSet = TestSet.create();
    testSet.addTestsFromFiles('./**/test.tsx');

    const testRunner = new TestRunner();

    testRunner.outputStream
        .pipe(TapBark.create().getPipeable())
        .pipe(process.stdout);

    await testRunner.run(testSet);
})().catch(e =>
{
    console.error(e);
    process.exit(1);
});
