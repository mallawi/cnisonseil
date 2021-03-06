<!DOCTYPE html>

<html lang="fr">
    <?php echo $__env->make("includes.head", array_except(get_defined_vars(), array('__data', '__path')))->render(); ?>

    <body>
        <main id="main--container">

            <?php echo $__env->make("includes.header", array_except(get_defined_vars(), array('__data', '__path')))->render(); ?>

            <?php echo $__env->yieldContent("content"); ?>

            <?php echo $__env->make("includes.footer", array_except(get_defined_vars(), array('__data', '__path')))->render(); ?>
        </main>
        <script src="/assets/js/app.js"></script>
        <script defer src="https://code.getmdl.io/1.2.1/material.min.js"></script>
    </body>
</html>