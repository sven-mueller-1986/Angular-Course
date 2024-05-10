namespace ShoppingList.Api.Extensions;

public static class TaskHelper
{
    public static Task DelayRandom()
    {
        var randomMilliseconds = new Random().Next(50, 2000);

        return Task.Delay(randomMilliseconds);
    }
}
